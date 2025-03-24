'use client';

import { useState } from 'react';
import { Search, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Footer from '@/components/shared/footer';
import { useRouter } from '@/routes/hooks';
import { useParams } from 'react-router-dom';
import {
  useGetServiceByServiceType,
  useGetServiceTypeByBranch
} from '@/queries/admin.query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

export default function StoreDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState<
    string | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  // Fetch service types for the branch
  const { data: serviceType } = useGetServiceTypeByBranch(String(id));

  // Fetch services for the selected service type
  const { mutateAsync: getServicesByType, data: services } =
    useGetServiceByServiceType();

  // Handle service type selection
  const handleServiceTypeClick = async (serviceTypeId: string) => {
    setSelectedServiceTypeId(serviceTypeId);
    try {
      await getServicesByType(serviceTypeId);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  // Fallback categories if serviceType data is not available
  const fallbackCategories = [
    { name: 'Cắt tỉa', icon: '✂️' },
    { name: 'Sức khỏe', icon: '🩺' },
    { name: 'Chăm sóc', icon: '🐕' },
    { name: 'Vệ sinh', icon: '🧼' }
  ];

  // Format price to Vietnamese currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Subheader */}
      <div className="bg-purple-300 py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="text-sm font-medium">
            TRANG CHỦ - CỬA HÀNG - THÚ Y K19
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="h-8 w-48 rounded-full bg-white pr-8"
              />
              <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4">
          {/* Services Category */}
          <section className="my-12">
            <h2 className="mb-6 text-xl font-bold">Services Category</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {serviceType
                ? // Display serviceType data if available
                  serviceType.map((type) => (
                    <div
                      key={type.id}
                      className={`flex cursor-pointer flex-col items-center rounded-lg border p-4 transition-colors ${
                        selectedServiceTypeId === type.id
                          ? 'border-purple-500 bg-purple-100'
                          : 'border-gray-200 hover:bg-purple-50'
                      }`}
                      onClick={() => handleServiceTypeClick(type.id)}
                    >
                      {type.linkImage && (
                        <div className="mb-2 h-12 w-12 overflow-hidden rounded-full">
                          <img
                            src={type.linkImage || '/placeholder.svg'}
                            alt={type.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <span className="text-center text-sm font-medium">
                        {type.name}
                      </span>
                    </div>
                  ))
                : // Fallback to default categories if data is not available
                  fallbackCategories.map(({ name, icon }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center rounded-lg border border-gray-200 p-4"
                    >
                      <div className="mb-2 text-3xl">{icon}</div>
                      <span className="text-center text-sm font-medium">
                        {name}
                      </span>
                    </div>
                  ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-6 text-xl font-bold">
              {selectedServiceTypeId
                ? `Services for ${serviceType?.find((type) => type.id === selectedServiceTypeId)?.name || 'Selected Category'}`
                : 'Available Services'}
            </h2>

            {!selectedServiceTypeId && !services?.length && (
              <div className="py-8 text-center text-gray-500">
                Please select a service category to view available services
              </div>
            )}

            {services?.data?.length === 0 && selectedServiceTypeId && (
              <div className="py-8 text-center text-gray-500">
                No services available for this category
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {services?.map((service) => (
                <div
                  key={service.id}
                  className="cursor-pointer overflow-hidden rounded-lg bg-purple-400"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="p-4 text-white">
                    <h3 className="mb-3 text-xl font-bold">{service.name}</h3>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-purple-300 px-3 py-1 text-sm">
                        {formatPrice(service.price)}
                      </span>
                      <span className="text-sm">
                        {service.estimatedCompletionTime} giờ
                      </span>
                    </div>
                    <div className="mb-4 h-40 overflow-hidden rounded bg-white">
                      <img
                        src={service.linkImage || '/placeholder.svg'}
                        alt={service.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {service.description && (
                      <p className="mb-3 text-sm">{service.description}</p>
                    )}
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        className="bg-purple-500/50 text-white hover:bg-purple-500"
                        onClick={() => router.push(`/booking/${service.id}`)}
                      >
                        <span>Booking now</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {services?.length > 0 && (
            <div className="mt-8 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      {/* Service Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedService?.name}</DialogTitle>
            <DialogDescription>
              Service details and booking information
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <div className="grid gap-4">
              <div className="h-48 overflow-hidden rounded-md">
                <img
                  src={selectedService.linkImage || '/placeholder.svg'}
                  alt={selectedService.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Price:</div>
                <div>{formatPrice(selectedService.price)}</div>

                <div className="font-medium">Duration:</div>
                <div>{selectedService.estimatedCompletionTime} giờ</div>
              </div>

              {selectedService.description && (
                <div className="mt-2">
                  <div className="mb-1 font-medium">Description:</div>
                  <p className="text-sm text-gray-600">
                    {selectedService.description}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button
              onClick={() => router.push(`/booking/${selectedService?.id}`)}
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              <span>Book This Service</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

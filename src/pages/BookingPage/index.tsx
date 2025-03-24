'use client';

import { useState } from 'react';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Footer from '@/components/shared/footer';
import { useCreateBooking, useGetAllPet } from '@/queries/admin.query';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export default function BookingPage() {
  const { serviceId } = useParams();
  const { data: dataPet } = useGetAllPet();

  const [selectedPet, setSelectedPet] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const { mutateAsync: createBooking } = useCreateBooking();
  const [formData, setFormData] = useState({
    nameCustomerBooking: '',
    phoneNumberCustomerBooking: '',
    emailCustomerBooking: '',
    addressGetPet: ''
  });
  const { toast } = useToast();
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !selectedPet) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      // Combine date and time
      const dateObj = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      dateObj.setHours(Number.parseInt(hours), Number.parseInt(minutes), 0);

      const bookingData = {
        userID: '8de72b7a-6323-4c5d-a9a9-d8dbd0f280d0',
        petId: selectedPet,
        bookingDetails: [
          {
            serviceId: serviceId
          }
        ],
        startTime: dateObj.toISOString(),
        addressGetPet: formData.addressGetPet,
        nameCustomerBooking: formData.nameCustomerBooking,
        phoneNumberCustomerBooking: formData.phoneNumberCustomerBooking,
        emailCustomerBooking: formData.emailCustomerBooking
      };

      console.log('Booking data:', bookingData);

      // Call the createBooking mutation
      const response = await createBooking(bookingData);

      console.log('Booking created:', response);

      if (response && response.paymentLink) {
        window.open(response.paymentLink, '_blank');
      } else {
        toast({
          title: 'Lịch đã bị trùng',
          description: 'Lịch đã được đặt.',
          variant: 'destructive',
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: 'Đặt lịch thất bại',
        description: 'Vui lòng thử lại sau.',
        variant: 'destructive',
        duration: 5000
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-[#e48ae0] bg-[#f3c6f1] px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-sm font-medium">
            <nav className="flex items-center space-x-2">
              <span>TRANG CHỦ</span>
              <span className="text-gray-600">&gt;</span>
              <span>DỊCH VỤ CHO THÚ CƯNG</span>
              <span className="text-gray-600">&gt;</span>
              <span>DỊCH VỤ TẮM CHO THÚ CƯNG</span>
              <span className="text-gray-600">&gt;</span>
              <span>ĐẶT LỊCH</span>
            </nav>
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
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-12 text-center text-4xl font-bold">
            Thông tin đặt lịch
          </h1>

          <div className="rounded-lg border p-8">
            <div className="mb-8">
              <p className="mb-1 text-center">
                Quý khách vui lòng cho biết thông tin
              </p>
              <p className="mb-6 text-center">
                Vui lòng nhập thông tin bắt buộc (
                <span className="text-red-500">*</span>)
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="nameCustomerBooking" className="block">
                  Họ và tên <span className="text-red-500">(*)</span>
                </label>
                <Input
                  id="nameCustomerBooking"
                  className="w-full"
                  required
                  value={formData.nameCustomerBooking}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumberCustomerBooking" className="block">
                  Số điện thoại <span className="text-red-500">(*)</span>
                </label>
                <Input
                  id="phoneNumberCustomerBooking"
                  className="w-full"
                  required
                  value={formData.phoneNumberCustomerBooking}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="emailCustomerBooking" className="block">
                  Email <span className="text-red-500">(*)</span>
                </label>
                <Input
                  id="emailCustomerBooking"
                  type="email"
                  className="w-full"
                  required
                  value={formData.emailCustomerBooking}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="addressGetPet" className="block">
                  Địa chỉ đón thú cưng <span className="text-red-500">(*)</span>
                </label>
                <Input
                  id="addressGetPet"
                  className="w-full"
                  required
                  value={formData.addressGetPet}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="pet" className="block">
                  Chọn thú cưng <span className="text-red-500">(*)</span>
                </label>
                <Select onValueChange={setSelectedPet} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn thú cưng của bạn" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataPet &&
                      dataPet.map((pet) => (
                        <SelectItem key={pet.id} value={pet.id}>
                          {pet.name} ({pet.breed}, {pet.age} tuổi)
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block">
                  Chọn ngày và giờ <span className="text-red-500">(*)</span>
                </label>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="w-full sm:w-1/2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !selectedDate && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, 'PPP')
                          ) : (
                            <span>Chọn ngày</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <Select onValueChange={setSelectedTime}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn giờ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="payment" className="block">
                  Chọn hình thức thanh toán{' '}
                  <span className="text-red-500">(*)</span>
                </label>
                <Select defaultValue="cash">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn hình thức thanh toán" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Thanh toán online</SelectItem>
                    <SelectItem value="cash">Thanh toán tiền mặt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button
                  type="submit"
                  className="mx-auto block w-full bg-[#a98bf8] py-1 text-lg hover:bg-[#9370ff] md:w-64"
                >
                  Đặt lịch
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

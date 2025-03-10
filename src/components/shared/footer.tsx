import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { Input } from '../ui/input';

export default function Footer() {
  return (
    <footer className="w-full bg-pink-600 py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold">Contact US</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About US
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  View More
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Customer Supports
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Our Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Benefits
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label htmlFor="email" className="mb-2 block">
                  Email của bạn
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email của bạn"
                  className="h-10 bg-white text-black"
                />
              </div>
              <Button className="h-10 bg-green-500 hover:bg-green-600">
                Gửi đi
              </Button>
            </div>
            <div className="mt-8">
              <img
                src="/placeholder.svg?height=100&width=200"
                alt="Cat"
                width={200}
                height={100}
                className="h-auto w-32"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

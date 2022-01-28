import React from 'react';

export function Footer(props) {
  return (
    <footer {...props} className="pt-12" style={{ backgroundColor: '#f1ebdd' }}>
      <div className="container mx-auto px-4 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Company</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <span className="hover:opacity-80 hover:cursor-pointer">
              About us
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Stockist
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Careers
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">CSR</span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Contact
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Site map
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Find a store</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <span className="hover:opacity-80 hover:cursor-pointer">
              London
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">Paris</span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Barcelona
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              New York
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Copenhagen
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              By Studio Appointment
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Customer Service</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <span className="hover:opacity-80 hover:cursor-pointer">
              Shipping info
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Theme Configuration
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Terms and conditions
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Returns
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Ordering
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Order status
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Shoe Care
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Size guide
            </span>
            <span className="hover:opacity-80 hover:cursor-pointer">FAQ´s</span>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Assistance</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <span className="hover:opacity-80 hover:cursor-pointer">Call</span>
            <span className="hover:opacity-80 hover:cursor-pointer">Email</span>
            <span className="hover:opacity-80 hover:cursor-pointer">
              Live chat
            </span>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="font-medium">Legal & Cookies</h2>
            <div className="flex flex-col space-y-2 text-sm">
              <span className="hover:opacity-80 hover:cursor-pointer">
                Privacy policy
              </span>
              <span className="hover:opacity-80 hover:cursor-pointer">
                Cookies Policy
              </span>
              <span className="hover:opacity-80 hover:cursor-pointer">
                Terms and conditions
              </span>
              <span className="hover:opacity-80 hover:cursor-pointer">
                Transparency in the supply chain
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 pt-12 pb-4 text-sm">
        <span>All right reserved</span>
      </div>
    </footer>
  );
}

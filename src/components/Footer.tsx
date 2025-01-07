import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">100xWallet</h2>
            <p className="text-sm text-gray-400">
              Your trusted partner in the world of cryptocurrency trading and secure wallet management.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-white hover:bg-gray-800">
                <Twitter size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-white hover:bg-gray-800">
                <Github size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-white hover:bg-gray-800">
                <Linkedin size={20} />
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Exchange</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wallet</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trading API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-sm text-gray-400">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-900 border-gray-800"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 100xWallet. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
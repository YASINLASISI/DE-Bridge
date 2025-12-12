import Link from 'next/link';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Twitter, Linkedin } from 'lucide-react';

const footerNavs = [
  {
    label: 'Product',
    items: [
      { href: '#', name: 'Find an Expert' },
      { href: '#', name: 'How it Works' },
      { href: '#', name: 'For Experts' },
      { href: '#', name: 'Pricing' },
    ],
  },
  {
    label: 'Company',
    items: [
      { href: '#', name: 'About Us' },
      { href: '#', name: 'Careers' },
      { href: '#', name: 'Blog' },
      { href: '#', name: 'Contact Us' },
    ],
  },
  {
    label: 'Legal',
    items: [
      { href: '#', name: 'Terms of Service' },
      { href: '#', name: 'Privacy Policy' },
      { href: '#', name: 'Cookie Policy' },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: '#' },
  { icon: Github, href: '#' },
  { icon: Linkedin, href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-foreground/60 max-w-xs font-bold">
              Bridging the gap between Nigeria and its diaspora expertise.
            </p>
            <div className="mt-6">
              <h3 className="text-sm font-semibold">Stay Updated</h3>
              <form className="mt-2 flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-xs"/>
                <Button type="submit" className="font-bold">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h3 className="font-semibold">{nav.label}</h3>
                <ul className="mt-4 space-y-2">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-foreground/60 hover:text-foreground transition-colors font-bold">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-sm text-foreground/60 font-bold">
            &copy; {new Date().getFullYear()} DE-Bridge. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link key={index} href={link.href} className="text-foreground/60 hover:text-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

import Logo from "@/components/logo";
import DiscordIcon from "@/components/icons/discord";
import TelegramIcon from "@/components/icons/telegram";

const footerLinks = {
  freelancers: [
    { href: "#", label: "Find Jobs" },
    { href: "#", label: "How It Works" },
    { href: "#", label: "Success Stories" },
    { href: "#", label: "Help Center" },
  ],
  clients: [
    { href: "#", label: "Post a Job" },
    { href: "#", label: "Browse Talent" },
    { href: "#", label: "Pricing" },
    { href: "#", label: "Safety & Trust" },
  ],
  company: [
    { href: "#", label: "About Us" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
  ],
};

const socialLinks = [
  { href: "#", icon: Twitter },
  { href: "#", icon: DiscordIcon },
  { href: "#", icon: Github },
  { href: "#", icon: TelegramIcon },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-muted-foreground">
      <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-16 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <Logo className="text-primary-foreground" />
          <p className="mt-4 text-base">Freelance Without Limits</p>
          <div className="mt-6 flex gap-4">
            {socialLinks.map(({ href, icon: Icon }) => (
              <Link key={href} href={href} className="text-muted-foreground hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground">For Freelancers</h4>
          <ul className="mt-4 space-y-2">
            {footerLinks.freelancers.map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="hover:text-primary-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground">For Clients</h4>
          <ul className="mt-4 space-y-2">
            {footerLinks.clients.map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="hover:text-primary-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground">Company</h4>
          <ul className="mt-4 space-y-2">
            {footerLinks.company.map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="hover:text-primary-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/10 py-6">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} BaseLance. Built on Base.</p>
          <p className="mt-2 sm:mt-0">Powered by Base L2</p>
        </div>
      </div>
    </footer>
  );
}

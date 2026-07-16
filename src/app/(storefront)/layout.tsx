import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <PageWrapper className="flex-grow pt-navbar-mobile md:pt-navbar">
        {children}
      </PageWrapper>
      <Footer />
    </>
  );
}

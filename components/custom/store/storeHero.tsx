import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ButtonShare from "../buttonShare";
const StoreHero = () => {
  return (
    <section className="mb-12 relative">
      {/* Hero Image */}
      <div className="relative w-full h-[calc(100vh_-_10rem)] overflow-hidden">
        <Image
          src="/images/uploads/store-hero.jpg"
          fill
          alt="Store Hero"
          className="object-cover"
        />
      </div>
      {/* Store Card Info */}
      <Card className="absolute bottom-0 w-11/12 max-w-xl translate-y-1/4 left-1/2 -translate-x-1/2 bg-background">
        <CardContent className="flex flex-row gap-4 relative">
          <Avatar className="w-18 h-18">
            <AvatarImage src="https://github.com/leerob.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-grow">
            <h1 className="text-lg font-semibold text-primary">Store Name</h1>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span className="ml-2">+20 123 456 7890</span>
              </p>

              <p className="flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span className="ml-2">123 Main St, Anytown, USA</span>
              </p>

              <p className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="ml-2">Mon - Fri: 9:00 AM - 5:00 PM</span>
              </p>

              <span className=" px-3 py-0.5 font-medium bg-green-100 text-green-800 border border-green-200 rounded-full">
                Open Now
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 mt-3">
              <ButtonShare />
              <Button variant="outline">Contact</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default StoreHero;

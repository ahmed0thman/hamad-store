"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

async function handleAddressSubmit(formData: FormData) {
  // Process submitted form here
}

interface Address {
  id: number;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: 1,
    name: "أحمد هشام",
    phone: "01001234567",
    address: "شارع التحرير، شقة ٤، مدينة نصر، القاهرة",
    isDefault: true,
  },
  {
    id: 2,
    name: "محمد علي",
    phone: "01006543210",
    address: "١٢ شارع النصر، المهندسين، الجيزة",
    isDefault: false,
  },
];

const AddressesPage = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAddress = () => {
    // This function is no longer used for form submission
  };

  const handleDelete = (id: number) => {
    const deletedAddress = addresses.find((a) => a.id === id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));

    toast("تم حذف العنوان", {
      description: deletedAddress?.name,
      duration: 5000,
      action: {
        label: "تراجع",
        onClick: () => {
          setAddresses((prev) => [...prev, deletedAddress!]);
        },
      },
    });
  };

  const handleEditClick = (address: Address) => {
    // Editing functionality removed as per instructions
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 px-4 py-6">
      {addresses.map((addr, idx) => (
        <div key={addr.id}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{addr.name}</h3>
              <p className="text-sm text-muted-foreground">{addr.address}</p>
              <p className="text-sm text-muted-foreground">{addr.phone}</p>
              {addr.isDefault && (
                <span className="inline-block mt-1 text-xs font-medium bg-teal-100 text-teal-700 px-2 py-0.5 rounded">
                  العنوان الافتراضي
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Button
                size="icon"
                variant="ghost"
                // Editing disabled per instructions
                // onClick={() => handleEditClick(addr)}
              >
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(addr.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
          {idx < addresses.length - 1 && <Separator className="my-4" />}
        </div>
      ))}

      <div className="pt-4">
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) handleDialogClose();
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={handleDialogOpen}
              className="flex-center ms-auto w-fit"
            >
              <Plus className="w-4 h-4 mr-2" />
              إضافة عنوان جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>إضافة عنوان جديد</DialogTitle>
            </DialogHeader>
            <form action={handleAddressSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input id="name" name="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" name="phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="governorate">المحافظة</Label>
                    <Input id="governorate" name="governorate" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة</Label>
                    <Input id="city" name="city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street">الشارع</Label>
                    <Input id="street" name="street" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment">رقم المنزل أو الشقة</Label>
                    <Input id="apartment" name="apartment" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="isDefault" name="isDefault" />
                  <Label htmlFor="isDefault">اجعل العنوان افتراضي</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDialogClose}
                >
                  إلغاء
                </Button>
                <Button type="submit">إضافة</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddressesPage;

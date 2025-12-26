"use client";

import Spinner from "@/components/custom/spinner";
import type { SubmitHandler } from "react-hook-form";
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
import {
  addUserAddress,
  deleteUserAddress,
  getUserAddresses,
} from "@/lib/api/apiUser";
import { UserAddress } from "@/types";
import { userAddressSchema } from "@/lib/validators";
import {
  Pencil,
  Trash2,
  Plus,
  Home,
  Phone,
  OctagonX,
  CheckCircle2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SpinnerMini from "@/components/custom/SpinnerMini";
import { set } from "zod";
import { useTranslation } from "@/hooks/useTranslation";

const AddressesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [pendingAddresses, startTransitionAddresses] = useTransition();
  const [pendingAction, startTransitionAction] = useTransition();
  const [mounted, setMounted] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<UserAddress | null>(null);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    reset,
    setValue,
    getValues,
  } = useForm<UserAddress>({
    resolver: zodResolver(userAddressSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      area: "",
      building: "",
      is_default: 0,
    },
  });

  useEffect(function () {
    startTransitionAddresses(fetchAddresses);
  }, []);

  async function fetchAddresses() {
    const addressesData = await getUserAddresses();
    if (addressesData?.success) {
      setAddresses(addressesData?.data as UserAddress[]);
      const defaultAddress = (addressesData?.data as UserAddress[])?.find(
        (addr) => addr.is_default
      );
    }
    setMounted(true);
  }

  useEffect(() => {
    if (!isDialogOpen) {
      handleReset();
    }
  }, [isDialogOpen, reset]);

  const handleReset = () => {
    reset({
      name: "",
      phone: "",
      building: "",
      city: "",
      area: "",
      is_default: 0,
    });
    setAddressToEdit(null);
    setIsDialogOpen(false);
  };

  const handleAddAddress: SubmitHandler<UserAddress> = async (data) => {
    startTransitionAction(async () => {
      const response = await addUserAddress(data, addressToEdit?.id ?? "");
      if (response?.success) {
        await fetchAddresses();
        handleReset();
        toast(
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>{t("addressSavedSuccessfully")}</span>
          </div>
        );
      } else {
        toast(
          <div className="flex items-center gap-2">
            <OctagonX className="w-4 h-4 text-red-500" />
            <span>{t("failedToSaveAddress")}</span>
          </div>
        );
      }
      setAddressToEdit(null);
    });
  };

  const handleDelete = (id: string) => {
    startTransitionAction(async () => {
      const response = await deleteUserAddress(id);
      if (response?.success) {
        await fetchAddresses();
        toast(
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>{t("addressDeletedSuccessfully")}</span>
          </div>
        );
      }
    });
  };

  const handleEditClick = (address: UserAddress) => {
    reset(address);
    setAddressToEdit(address);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  if (pendingAddresses || !mounted) {
    return (
      <div className="animate-pulse">
        <div className="space-y-6 px-4 py-6">
          <div className=" bg-muted rounded h-40"></div>
          <div className=" bg-muted rounded h-40"></div>
        </div>
      </div>
    );
  }

  if (!addresses || addresses.length === 0) {
    return (
      <div className="space-y-6 px-4 py-6">
        <p className="text-sm text-muted-foreground">
          {t("noAddressesAvailable")}
        </p>
        <div className="pt-4">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setAddressToEdit(null);
              if (!open) {
                handleReset();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                onClick={handleDialogOpen}
                className="flex-center ms-auto w-fit"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("addNewAddress")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{t("addNewAddress")}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(handleAddAddress)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("name")}</Label>
                      <Input {...register("name")} type="text" />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("phoneNumber")}</Label>
                      <Input {...register("phone")} type="tel" />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="building">{t("building")}</Label>
                      <Input {...register("building")} type="text" />
                      {errors.building && (
                        <p className="text-red-500 text-sm">
                          {errors.building.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">{t("city")}</Label>
                      <Input {...register("city")} type="text" />
                      {errors.city && (
                        <p className="text-red-500 text-sm">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">{t("area")}</Label>
                      <Input {...register("area")} type="text" />
                      {errors.area && (
                        <p className="text-red-500 text-sm">
                          {errors.area.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      onCheckedChange={(checked) =>
                        setValue("is_default", checked ? 1 : 0)
                      }
                      id="isDefault"
                      // checked={getValues("is_default") === 1}
                    />
                    <Label htmlFor="isDefault">{t("makeDefaultAddress")}</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDialogClose}
                  >
                    {t("cancel")}
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {t("save")}
                    {isSubmitting && <SpinnerMini />}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 py-6">
      {addresses.map((addr, idx) => (
        <div key={addr.id}>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{addr.name}</h3>
              <p className=" text-muted-foreground">
                <Home className="inline-block me-2 w-4 h-4" />
                {addr.city}, {addr.area}, {addr.building}
              </p>
              <div className="flex items-center text-muted-foreground">
                <Phone className="inline-block me-2 w-4 h-4" />
                <p className="text-phone">{addr.phone}</p>
              </div>
              {addr.is_default ? (
                <span className="inline-block mt-1 text-sm font-medium bg-teal-100/80 text-teal-900 px-2 py-0.5 rounded">
                  {t("defaultAddress")}
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleEditClick(addr)}
              >
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("deleteAddress")}</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground">
                    {t("deleteAddressConfirmation")}
                  </p>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogDeleteOpen(false)}
                    >
                      {t("cancel")}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(addr.id ?? "")}
                    >
                      {t("delete")}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {idx < addresses.length - 1 && <Separator className="my-4" />}
        </div>
      ))}

      <div className="pt-4">
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setAddressToEdit(null);
            if (!open) {
              handleReset();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={handleDialogOpen}
              className="flex-center ms-auto w-fit"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("addNewAddress")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{t("addNewAddress")}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleAddAddress)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input {...register("name")} type="text" />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phoneNumber")}</Label>
                    <Input {...register("phone")} type="tel" />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="building">{t("building")}</Label>
                    <Input {...register("building")} type="text" />
                    {errors.building && (
                      <p className="text-red-500 text-sm">
                        {errors.building.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">{t("city")}</Label>
                    <Input {...register("city")} type="text" />
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">{t("area")}</Label>
                    <Input {...register("area")} type="text" />
                    {errors.area && (
                      <p className="text-red-500 text-sm">
                        {errors.area.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    onCheckedChange={(checked) =>
                      setValue("is_default", checked ? 1 : 0)
                    }
                    id="isDefault"
                    // checked={getValues("is_default") === 1}
                  />
                  <Label htmlFor="isDefault">{t("makeDefaultAddress")}</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDialogClose}
                >
                  {t("cancel")}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {t("save")}
                  {isSubmitting && <SpinnerMini />}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddressesPage;

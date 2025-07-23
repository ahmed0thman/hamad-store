"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ButtonStepNav from "./buttonStepNav";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Address = {
  name: string;
  address: string;
};

export default function ChooseLocationTab({ onNext }: { onNext: () => void }) {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      name: "Sophia Clark",
      address: "123 Elm Street, Apt 4B, Springfield, 62704",
    },
    {
      name: "Liam Carter",
      address: "456 Oak Avenue, Unit 2C, Springfield, 62704",
    },
    {
      name: "Noah Bennett",
      address: "789 Pine Lane, Suite 1A, Springfield, 62704",
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState("Sophia Clark");
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [setDefault, setSetDefault] = useState(false);

  const handleAddAddress = () => {
    const newEntry = { name: newName, address: newAddress };
    setAddresses([...addresses, newEntry]);
    if (setDefault) {
      setSelectedAddress(newName);
    }
    setOpen(false);
    setNewName("");
    setNewAddress("");
    setNewPhone("");
    setSetDefault(false);
  };

  return (
    <div className="space-y-4 pt-4">
      <h3 className="text-lg font-bold text-foreground">Choose Location</h3>
      <RadioGroup
        value={selectedAddress}
        onValueChange={setSelectedAddress}
        className="space-y-3"
      >
        {addresses.map((addr) => (
          <label
            key={addr.name}
            className="flex items-center gap-4 border p-4 rounded-xl border-border"
          >
            <RadioGroupItem value={addr.name} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm text-foreground">
                  {addr.name}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{addr.address}</p>
            </div>
            {selectedAddress === addr.name && (
              <Badge variant="outline" className="text-xs ms-auto">
                default
              </Badge>
            )}
          </label>
        ))}
      </RadioGroup>
      <div className="flex justify-between">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">Add New Address</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="set-default"
                  checked={setDefault}
                  onCheckedChange={(v) => setSetDefault(!!v)}
                />
                <Label htmlFor="set-default">Set as default</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddAddress}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <ButtonStepNav handleClick={onNext}>
          Next
          <ArrowRight className="auto-dir" />
        </ButtonStepNav>
      </div>
    </div>
  );
}

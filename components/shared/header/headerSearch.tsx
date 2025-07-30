import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/api/apiProducts";
import { category } from "@/types";
import { Search } from "lucide-react";
import React from "react";

const HeaderSearch = async () => {
  const categories: category[] = await getAllCategories();
  return (
    <div className="!border-primary border rounded-md bg-secondary h-9 md:h-10 flex-center overflow-hidden">
      <div className="flex-center py-2">
        <Select>
          <SelectTrigger className="!text-froreground !bg-transparent w-36 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 ">
            <SelectValue
              placeholder="All Categories"
              className="text-gray-500"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="text"
          className="h-full !bg-transparent shadow-none border-0 border-s !border-stone-300 dark:!border-stone-700 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 leading-0 !text-base text-gray-700"
          placeholder="Search for products..."
        />
      </div>
      <Button className="h-full rounded-sm shadow-none">
        <Search />
      </Button>
    </div>
  );
};

export default HeaderSearch;

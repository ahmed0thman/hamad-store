import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import StarRating from "../starRating";
import { Cart } from "@/types";
import { CartItem } from "@/types";

const RatingDialog = ({ item }: { item: CartItem }) => {
  const [ratings, setRatings] = useState<number>(0);
  const [comments, setComments] = useState<string>("");

  const handleRateSubmit = (id: string) => {
    // TODO: send rating and comment to API
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full bg-muted">
          Rate
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Rate {item.name}</DialogTitle>
        <div className="flex-center">
          <StarRating
            readOnly={false}
            value={0}
            onChange={(v) => setRatings(v)}
          />
        </div>
        <textarea
          placeholder="Add a comment"
          className="w-full mt-4 p-2 border rounded"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <Button
          className="mt-4"
          onClick={() => handleRateSubmit(item.productId)}
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;

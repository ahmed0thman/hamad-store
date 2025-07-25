import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        تفاصيل الحساب
      </h1>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="first-name"
              className="mb-1 block text-sm font-medium text-muted-foreground"
            >
              الاسم الأول *
            </Label>
            <Input
              id="first-name"
              name="first-name"
              placeholder="الاسم الأول"
              type="text"
            />
          </div>
          <div>
            <Label
              htmlFor="last-name"
              className="mb-1 block text-sm font-medium text-muted-foreground"
            >
              الاسم الأخير *
            </Label>
            <Input
              id="last-name"
              name="last-name"
              placeholder="الاسم الأخير"
              type="text"
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-muted-foreground"
            >
              رقم الهاتف *
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="رقم الهاتف"
              type="tel"
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-muted-foreground"
            >
              البريد الإلكتروني *
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="البريد الإلكتروني"
              type="email"
            />
          </div>
          <div>
            <Label
              htmlFor="age"
              className="mb-1 block text-sm font-medium text-muted-foreground"
            >
              العمر *
            </Label>
            <Input id="age" name="age" placeholder="العمر" type="number" />
          </div>
          <div>
            <Label
              htmlFor="gender"
              className="mb-1 block text-sm font-medium text-muted-foreground"
            >
              الجنس *
            </Label>
            <Input id="gender" name="gender" placeholder="الجنس" type="text" />
          </div>
          <div className="md:col-span-2">
            <Label
              htmlFor="governorate"
              className="mb-1 block text-sm font-medium text-muted-foreground"
            >
              المحافظة *
            </Label>
            <Input id="governorate" name="governorate" placeholder="المحافظة" />
          </div>
        </div>

        <hr className="my-8 border-muted" />

        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          كلمة المرور
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="current-password"
              className="mb-1 block text-sm font-medium text-muted-foreground"
            >
              كلمة المرور القديمة
            </Label>
            <Input
              id="current-password"
              type="password"
              placeholder="كلمة المرور القديمة"
            />
          </div>
          <div className="hidden md:block" />
          <div>
            <Label
              htmlFor="new-password"
              className="mb-1 block text-sm font-medium text-muted-foreground"
            >
              كلمة المرور الجديدة
            </Label>
            <Input
              id="new-password"
              type="password"
              placeholder="كلمة المرور الجديدة"
            />
          </div>
          <div>
            <Label
              htmlFor="confirm-password"
              className="mb-1 block text-sm font-medium text-muted-foreground"
            >
              تأكيد كلمة المرور الجديدة
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="تأكيد كلمة المرور الجديدة"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit">حفظ التغييرات</Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

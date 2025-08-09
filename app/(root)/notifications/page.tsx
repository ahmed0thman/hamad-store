"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Package,
  CheckCircle,
  Truck,
  XCircle,
  RotateCcw,
  ShoppingCart,
  Clock,
  AlertCircle,
} from "lucide-react";

type NotificationType =
  | "order_placed"
  | "order_confirmed"
  | "order_delivered"
  | "order_shipped"
  | "order_canceled"
  | "return_request_placed"
  | "return_request_accepted"
  | "return_request_rejected";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  orderId: string;
  timestamp: string;
  isRead: boolean;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order_placed",
      title: "تم وضع الطلب",
      message: "تم تأكيد طلبك رقم #ORD-001 بنجاح وسيتم معالجته قريباً",
      orderId: "ORD-001",
      timestamp: "2025-08-09T10:30:00Z",
      isRead: false,
    },
    {
      id: "2",
      type: "order_confirmed",
      title: "تم تأكيد الطلب",
      message: "تم تأكيد طلبك رقم #ORD-002 وجاري تجهيزه للشحن",
      orderId: "ORD-002",
      timestamp: "2025-08-09T09:15:00Z",
      isRead: false,
    },
    {
      id: "3",
      type: "order_shipped",
      title: "تم شحن الطلب",
      message: "تم شحن طلبك رقم #ORD-003 وسيصل خلال 2-3 أيام عمل",
      orderId: "ORD-003",
      timestamp: "2025-08-08T14:20:00Z",
      isRead: true,
    },
    {
      id: "4",
      type: "order_delivered",
      title: "تم تسليم الطلب",
      message:
        "تم تسليم طلبك رقم #ORD-004 بنجاح. نتمنى أن تكون راضياً عن المنتجات",
      orderId: "ORD-004",
      timestamp: "2025-08-07T16:45:00Z",
      isRead: true,
    },
    {
      id: "5",
      type: "order_canceled",
      title: "تم إلغاء الطلب",
      message:
        "تم إلغاء طلبك رقم #ORD-005 وسيتم استرداد المبلغ خلال 3-5 أيام عمل",
      orderId: "ORD-005",
      timestamp: "2025-08-07T11:30:00Z",
      isRead: true,
    },
    {
      id: "6",
      type: "return_request_placed",
      title: "طلب إرجاع جديد",
      message: "تم إرسال طلب إرجاع للطلب #ORD-006 وجاري مراجعته",
      orderId: "ORD-006",
      timestamp: "2025-08-06T13:20:00Z",
      isRead: false,
    },
    {
      id: "7",
      type: "return_request_accepted",
      title: "تم قبول طلب الإرجاع",
      message:
        "تم قبول طلب إرجاع الطلب #ORD-007. يرجى إرسال المنتج لاستكمال عملية الإرجاع",
      orderId: "ORD-007",
      timestamp: "2025-08-05T10:15:00Z",
      isRead: true,
    },
    {
      id: "8",
      type: "return_request_rejected",
      title: "تم رفض طلب الإرجاع",
      message: "تم رفض طلب إرجاع الطلب #ORD-008 لعدم استوفاء شروط الإرجاع",
      orderId: "ORD-008",
      timestamp: "2025-08-04T15:45:00Z",
      isRead: true,
    },
  ]);

  const getNotificationIcon = (type: NotificationType) => {
    const iconProps = { size: 20 };

    switch (type) {
      case "order_placed":
        return <ShoppingCart {...iconProps} className="text-blue-600" />;
      case "order_confirmed":
        return <CheckCircle {...iconProps} className="text-green-600" />;
      case "order_shipped":
        return <Truck {...iconProps} className="text-purple-600" />;
      case "order_delivered":
        return <Package {...iconProps} className="text-green-700" />;
      case "order_canceled":
        return <XCircle {...iconProps} className="text-red-600" />;
      case "return_request_placed":
        return <RotateCcw {...iconProps} className="text-orange-600" />;
      case "return_request_accepted":
        return <CheckCircle {...iconProps} className="text-green-600" />;
      case "return_request_rejected":
        return <XCircle {...iconProps} className="text-red-600" />;
      default:
        return <Bell {...iconProps} className="text-gray-600" />;
    }
  };

  const getNotificationBadge = (type: NotificationType) => {
    switch (type) {
      case "order_placed":
        return <Badge variant="secondary">جديد</Badge>;
      case "order_confirmed":
        return <Badge variant="default">مؤكد</Badge>;
      case "order_shipped":
        return <Badge variant="secondary">مُرسل</Badge>;
      case "order_delivered":
        return (
          <Badge variant="default" className="bg-green-600">
            مُسلم
          </Badge>
        );
      case "order_canceled":
        return <Badge variant="destructive">ملغي</Badge>;
      case "return_request_placed":
        return <Badge variant="outline">طلب إرجاع</Badge>;
      case "return_request_accepted":
        return (
          <Badge variant="default" className="bg-green-600">
            مقبول
          </Badge>
        );
      case "return_request_rejected":
        return <Badge variant="destructive">مرفوض</Badge>;
      default:
        return <Badge variant="secondary">إشعار</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "الآن";
    } else if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `منذ ${diffInDays} يوم`;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="wrapper min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                الإشعارات
              </h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0
                  ? `${unreadCount} إشعار غير مقروء`
                  : "جميع الإشعارات مقروءة"}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              تعيين الكل كمقروء
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد إشعارات</h3>
                <p className="text-muted-foreground text-center">
                  ستظهر هنا جميع إشعاراتك المتعلقة بالطلبات والإرجاعات
                </p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification, index) => (
              <Card
                key={notification.id}
                className={`transition-all duration-200 hover:shadow-md ${
                  !notification.isRead
                    ? "border-l-4 border-l-primary bg-primary/5"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            {getNotificationBadge(notification.type)}
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              {notification.orderId}
                            </span>
                          </div>
                        </div>
                      </div>

                      {!notification.isRead && (
                        <div className="mt-3">
                          <Button
                            onClick={() => markAsRead(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                          >
                            تعيين كمقروء
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>

                {index < notifications.length - 1 && <Separator />}
              </Card>
            ))
          )}
        </div>

        {/* Footer info */}
        {notifications.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <AlertCircle className="h-4 w-4" />
              سيتم الاحتفاظ بالإشعارات لمدة 30 يوماً
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

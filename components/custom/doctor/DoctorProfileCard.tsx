import React from "react";
import { DoctorProfileT } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import getLocaleStrings from "@/localization";

export default async function DoctorProfileCard({
  doctor,
}: {
  doctor: DoctorProfileT;
}) {
  const locale = await getLocaleStrings();
  const initials = `${doctor.first_name?.[0] || ""}${
    doctor.last_name?.[0] || ""
  }`.toUpperCase();
  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center gap-4">
      <Avatar className="w-24 h-24">
        <AvatarImage
          src={doctor.profile_image || undefined}
          alt={doctor.first_name + " " + doctor.last_name}
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-1">
          {locale.doctorPrefix} {doctor.first_name} {doctor.last_name}
        </h2>
        <p className="text-muted-foreground mb-2">{doctor.specialization}</p>

        {doctor.bio && <p className="text-base mb-2">{doctor.bio}</p>}
        {/* {doctor.phone && (
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {locale.phone}: {doctor.phone}
          </p>
        )} */}
        {doctor.certificate_file &&
          (() => {
            const isPdf = doctor.certificate_file
              .toLowerCase()
              .endsWith(".pdf");
            const isImage = /\.(jpg|jpeg|png|svg|webp)$/i.test(
              doctor.certificate_file
            );
            if (isPdf) {
              return (
                <a
                  href={doctor.certificate_file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-teal-600 hover:underline text-sm"
                >
                  {locale.viewCertificate} (PDF)
                </a>
              );
            } else if (isImage) {
              return (
                <div className="mt-4 flex flex-col items-center">
                  <span className="text-sm text-muted-foreground mb-1">
                    {locale.certificateImage}
                  </span>
                  <img
                    src={doctor.certificate_file}
                    alt="Doctor Certificate"
                    className="max-h-48 rounded shadow border"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              );
            }
            return null;
          })()}
      </div>
    </div>
  );
}

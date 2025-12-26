import DoctorProfileCard from "@/components/custom/doctor/DoctorProfileCard";
import { getDoctorProfile } from "@/lib/api/apiPublic";
import { DoctorProfileT } from "@/types";
import React from "react";

const Doctor = async ({ params }: { params: Promise<{ id: string }> }) => {
  const res = await getDoctorProfile(Number((await params)?.id));

  if (!res.success) {
    return <div>Error: {res.message}</div>;
  }

  const doctorProfile = res.data as DoctorProfileT;

  return (
    <div className="py-8">
      <DoctorProfileCard doctor={doctorProfile} />
    </div>
  );
};

export default Doctor;

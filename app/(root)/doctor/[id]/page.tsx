import { getDoctorProfile } from "@/lib/api/apiPublic";
import { DoctorProfileT } from "@/types";
import React from "react";
import DoctorProfileCard from "@/components/custom/doctor/DoctorProfileCard";

import type { Metadata, ResolvingMetadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Doctor = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const res = await getDoctorProfile(Number(resolvedParams.id));

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

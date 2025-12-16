import api from "./axios";

export interface PublicEnquiryPayload{
    fullName: string;
    mobileNumber: string;
    city: string;
    serviceNeeded: string;
}

export const submitPublicEnquiry = async (
  payload: PublicEnquiryPayload
) => {
  const response = await api.post("/public/enquiry", payload);
  return response.data;
};
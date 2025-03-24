import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';
export const useGetAllStore = () => {
  return useQuery({
    queryKey: ['get_all_store'],
    queryFn: async () => {
      return BaseRequest.Get(`/api/store/get-all`);
    },
    staleTime: 3600000
  });
};

export const useGetServiceTypeByBranch = (branchId: string) => {
  return useQuery({
    queryKey: ['get_service_type_by_branch', branchId],
    queryFn: async () => {
      return BaseRequest.Get(
        `/api/service-type/get-by-branch?BranchId=${branchId}`
      );
    }
  });
};

export const useGetServiceByServiceType = () => {
  return useMutation({
    mutationKey: ['get_service_by_service_type'],
    mutationFn: async (serviceTypeId: string) => {
      return BaseRequest.Get(
        `/api/service/get-service-by-service-type?serviceTypeId=${serviceTypeId}`
      );
    }
  });
};

export const useGetAllPet = () => {
  return useQuery({
    queryKey: ['get_all_pet'],
    queryFn: async () => {
      return BaseRequest.Get(`/api/pet/get-all`);
    }
  });
};

export const useCreateBooking = () => {
  return useMutation({
    mutationKey: ['create_booking'],
    mutationFn: async (data: any) => {
      return BaseRequest.Post(`/api/booking/add`, data);
    }
  });
};

import { AxiosError } from "axios";
import { toast } from "react-toastify";

// TODO: Handle status code error more extensively
const ProcessError = (error: Error | AxiosError | any) => {
  if (error?.response?.data?.message) {
    toast.error(error?.response?.data?.message);
    return error?.response?.data?.message;
  } else if (
    error?.response?.data?.detail &&
    error?.response?.data?.detail instanceof Array
  ) {
    error?.response?.data?.detail?.map((det: Record<string, string>) => {
      if (det?.msg) {
        toast.error(det?.msg);
      }
      return "incomplete or incorrect details";
    });
  } else if (error?.response?.data?.detail) {
    toast.error(error?.response?.data?.detail);
  } else if (error?.response?.status === 422) {
    error?.message("incomplete or incorrect details");
    return "incomplete or incorrect details";
  } else if (error?.response?.status >= 500) {
    toast.error("We could not connect to the server");
    return "We could not connect to the server";
  } else {
    toast.error("An Error occurred");
  }
};

export default ProcessError;
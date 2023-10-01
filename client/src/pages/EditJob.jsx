import { FormRow, FormRowSelect, SubmitBtn } from "../Components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success("job edited successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};
const EditJob = () => {
  const { job } = useLoaderData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <div className="form-center">
          <FormRow type="text" name="position" defaultvalue={job.position} />
          <FormRow type="text" name="company" defaultvalue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labeltext="job location"
            defaultvalue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;

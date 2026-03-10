import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function FormErrors({ errors }: any) {
  return (
    <>
      {errors && (
        <Alert variant="destructive" className="my-3">
          <AlertCircleIcon />
          <AlertTitle>Oops! Something went wrong</AlertTitle>
          <AlertDescription>
            <ul className="list-disc">
              {errors.map((message: any, index: any) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}

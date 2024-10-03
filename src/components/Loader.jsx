import { Spinner } from "reactstrap";


export default function Loader(){
    return(
        <div className="container d-flex justify-content-center p-5">
            <Spinner color="primary" />
            <p className="ms-3">Please wait few seconds ...</p>
        </div>
    )
}
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Card } from "reactstrap";

export default function PostCard({id, title, stat, publishedAt, updatedAt, image, content}){
    const [showed, setShowed] = useState(false);
    const buttonText = showed ? "Hide details" : "Show details";

    const handleClick = () => setShowed(!showed);

    return( 
        <Card className="col-md-5 col-sm-10 mt-3">
            <div className="p-3 row justify-content-between">
                <div className="col-sm-12 col-md-8">
                    <h5>{id} - {title}</h5> 
                    <p className="text-muted">
                        {stat} {publishedAt}
                        <br />Last updated {updatedAt}
                    </p>
                    <Button onClick={handleClick} className="mb-3">{buttonText}</Button>
                </div>
                <div className="col-sm-12 col-md-4">
                    <img src= {image} alt="Image" className="img-fluid"/>
                </div>
                {showed && <p>{content}</p>}
            </div>
        </Card>
    )       
}
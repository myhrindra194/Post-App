/* eslint-disable react/prop-types */   
import PostCard from "./PostCard";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";


export default function ListPost({name}){
    return (name.length === 0) ?
    <p className="text-center mt-5">No post found</p>:
    <div className="container">
        <div className="mt-3 row d-flex justify-content-evenly align-items-start">
            {
                name.map(post => (
                    <PostCard
                        key={post.id} 
                        id={post.id}
                        title={post.title}
                        stat={post.status}
                        publishedAt={post.publishedAt}
                        updatedAt={post.updatedAt}  
                        image={post.image}
                        content={post.content}
                    />
                ))
            }
            <div className=" mt-5 d-flex justify-content-center">
                <Pagination>
                    <PaginationItem>
                    <PaginationLink href="#" previous/>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#"> 1 </PaginationLink>
                    </PaginationItem>
                    <PaginationItem> 
                    <PaginationLink href="#"> 2 </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#"> 3 </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#" next/>
                    </PaginationItem>
                </Pagination>
            </div>
       </div>
    </div>
}

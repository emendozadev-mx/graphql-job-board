import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getJob} from "../graphql/queries";

function JobDetail() {
    const {jobId} = useParams();

    const [job, SetJob] = useState(null);

    useEffect(() => {
        getJob(jobId).then(SetJob);
    }, [jobId]);


    return (job ? <div>
        <h1 className="title">{job?.title}</h1>
        <h2 className="subtitle">
            <Link to={`/companies/${job?.company?.id}`}>{job?.company?.name}</Link>
        </h2>
        <div className="box">{job?.description}</div>
    </div> : <p>Loading...</p>);
}

export default JobDetail;

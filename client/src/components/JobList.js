import {Link} from "react-router-dom";

function JobItem({job, index}) {
    const title = job.company ? `${job.title} at ${job.company.name}` : job.title;
    return (
        <li className="media">
            <div className="media-content">
                <span className="block"> {index + 1} </span>
                <Link to={`/jobs/${job.id}`}>{title}</Link>
            </div>
        </li>
    );
}

function JobList({jobs}) {
    return (
        <ol className="box">
            {jobs.map((job, index) => (
                <JobItem key={job.id} job={job} index={index}/>
            ))}
        </ol>
    );
}

export default JobList;

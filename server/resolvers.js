import {Company, Job} from "./db.js";

const rejectIf = (condition) => {
    if (condition) {
        throw new Error('Unauthorized');
    }
}

export const resolvers = {
    Query: {
        company: (_, {id}) => Company.findById(id),
        job: (_, {id}) => Job.findById(id),
        jobs: () => Job.findAll(),
    },
    Mutation: {
        createJob: (_root, {input}, {user}) => {
            rejectIf(!user);

            return Job.create({...input, companyId: user.companyId});
        },
        deleteJob: async (_root, {id}, {user}) => {
            rejectIf(!user);

            const job = await Job.findById(id);

            rejectIf(!job || job.companyId !== user.companyId);

            return Job.delete(id);

        },
        updateJob: async (_root, {input}, {user}) => {
            rejectIf(!user);

            const job = await Job.findById(input.id);

            rejectIf(!job || job.companyId !== user.companyId || user.companyId !== input.companyId);

            return Job.update({...job,...input});
        }
    },
    Company: {
        jobs: ({id}) => Job.findAll(job => job.companyId === id)
    },
    Job: {
        company: ({companyId}) => Company.findById(companyId),
    },
};

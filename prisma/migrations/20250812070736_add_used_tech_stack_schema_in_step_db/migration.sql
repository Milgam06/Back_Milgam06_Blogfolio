-- CreateEnum
CREATE TYPE "ETechStack" AS ENUM ('Typescript', 'Javascript', 'Python', 'React', 'ReactNative', 'NextJS', 'Vite', 'NodeJS', 'NestJS', 'Express', 'FastAPI', 'Axios', 'Zustand', 'Recoil', 'ReactQuery', 'Prisma', 'ESLint', 'Prettier', 'PostgreSQL', 'MySQL', 'Supabase', 'GraphQL', 'RestApi', 'Mantine', 'StyledComponents', 'FramerMotion', 'Reanimated', 'Fontawesome', 'Notion', 'GitHub', 'OpenAI', 'Docker', 'AWS', 'Oracle', 'Firebase', 'GoogleAnalytics', 'Storybook', 'Figma', 'Postman', 'Cloudflare', 'Copilot', 'Vercel');

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "usedTechStack" "ETechStack"[];

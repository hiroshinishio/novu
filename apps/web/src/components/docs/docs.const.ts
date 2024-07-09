import { ROUTES } from '../../constants/routes';

export const CONCEPT_PATHS = {
  CONTROLS: 'concepts/controls',
  ENDPOINT: 'concepts/endpoint',
  WORKFLOWS: 'concepts/workflows',
  TENANTS: 'concepts/tenants',
  SUBSCRIBERS: 'concepts/subscribers',
} as const;

export const PATHS: { [key in ROUTES]?: string } = {
  [ROUTES.INTEGRATIONS]: 'integrations/providers/introduction',
  [ROUTES.SUBSCRIBERS]: CONCEPT_PATHS.SUBSCRIBERS,
  [ROUTES.WORKFLOWS]: CONCEPT_PATHS.WORKFLOWS,
  [ROUTES.TENANTS]: CONCEPT_PATHS.TENANTS,
  [ROUTES.STUDIO_ONBOARDING]: 'quickstart/nextjs',
  [ROUTES.STUDIO_ONBOARDING_PREVIEW]: CONCEPT_PATHS.CONTROLS,
  [ROUTES.STUDIO_FLOWS]: 'workflow/introduction',
  [ROUTES.STUDIO_FLOWS_VIEW]: 'workflow/introduction',
};

export const DOCS_URL = 'https://docs.novu.co';

export const MINTLIFY_IMAGE_URL = 'https://mintlify.s3-us-west-1.amazonaws.com/novu';

export const MDX_URL = 'https://cloud-doc.vercel.app/';

import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'development' 
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: 'Willitgrain-org/willitgrain',
      },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: 'yaml',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        runtime: fields.text({ label: 'Runtime (e.g. 15min)' }),
        posterUrl: fields.image({ 
          label: 'Poster Image',
          directory: 'public/projects',
          publicPath: '/projects',
          validation: { isRequired: false }
        }),
        crewUnitedUrl: fields.text({ label: 'Crew United URL' }),
        filmfreewayUrl: fields.text({ label: 'Filmfreeway URL' }),
        trailerUrl: fields.text({ label: 'Trailer YouTube URL' }),
        
        stills: fields.array(
          fields.image({ 
            label: 'Image',
            directory: 'public/projects',
            publicPath: '/projects'
          }), {
          label: 'Stills Images'
        }),
        bts: fields.array(
          fields.image({ 
            label: 'Image',
            directory: 'public/projects',
            publicPath: '/projects'
          }), {
          label: 'Behind The Scenes Images'
        }),

        en: fields.object({
          title: fields.text({ label: 'Title (English)' }),
          type: fields.text({ label: 'Type (English)' }),
          genre: fields.text({ label: 'Genre (English)' }),
          synopsis: fields.text({ label: 'Synopsis (English)', multiline: true }),
          billingHeader: fields.text({ label: 'Billing Header (English)', multiline: true }),
          billingFooter: fields.text({ label: 'Billing Footer (English)', multiline: true }),
        }),

        de: fields.object({
          title: fields.text({ label: 'Title (German)' }),
          type: fields.text({ label: 'Type (German)' }),
          genre: fields.text({ label: 'Genre (German)' }),
          synopsis: fields.text({ label: 'Synopsis (German)', multiline: true }),
          billingHeader: fields.text({ label: 'Billing Header (German)', multiline: true }),
          billingFooter: fields.text({ label: 'Billing Footer (German)', multiline: true }),
        }),

        crewEn: fields.text({
          label: 'Crew List (English)',
          description: 'One per line: "Role: Name" (e.g. "Production Design: Michelle Kleist, Ramona Overhoff")',
          multiline: true,
        }),

        crewDe: fields.text({
          label: 'Crew List (German)',
          description: 'Eine Zeile pro Person: "Rolle: Name" (z.B. "Szenenbild: Michelle Kleist, Ramona Overhoff")',
          multiline: true,
        }),
      },
    }),
  },
});

export type CatalogSource =
    | {
          type: 'provider';
          id: number;
          name: string;
          logo: string;
          count: number;
      }
    | {
          type: 'studio';
          id: number;
          name: string;
          logo: string;
          count: number;
      };

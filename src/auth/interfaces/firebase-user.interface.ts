export interface FirebaseUser {
  uid: string;

  email?: string;

  aud: string;

  iss: string;

  sub: string;

  iat: number;

  exp: number;

  auth_time: number;

  firebase?: {
    identities?: Record<string, unknown>;

    sign_in_provider?: string;

    tenant?: string;
  };
}

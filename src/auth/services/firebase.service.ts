import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  verifyToken(token: string) {
    return admin.auth().verifyIdToken(token);
  }
}

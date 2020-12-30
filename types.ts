import { firestore } from 'firebase'

export interface Report {
  id: string
  imageUrl: Promise<string>
  imageFileName: string
  title: string
  createdAt: firestore.Timestamp
  url: string
  tags: string[]
}

export interface NewReport {
  imageFile: Blob
  imageFileName: string
  title: string
  createdAt: firestore.Timestamp
  url: string
  tags: string[]
}

export interface UpdatedReport {
  id: string
  title: string
  url: string
  tags: string[]
}

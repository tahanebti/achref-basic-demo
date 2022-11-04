export interface BaseEntity {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    createdBy: Person,
    updatedBy: Person
  }

export interface Person {
    id: string
    name: string
    email: string
    profile: Profile
    position: string
    phone: string
    type: string
}

export interface Profile  {
    firstName: string,
    lastName: string,
    imageUrl: string  
}


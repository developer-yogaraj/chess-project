export const dbConstants = {
    DATA_SOURCE_NAME: 'CHESS',
    SCHEMA_NAME: 'db',
  };

  export const entity = {
    PLAYERS_ARBITERS: 'players_arbiters',
  };
  
  export const Exceptions = {
    INVALID_EMAIL_OR_PASSWORD: 'INVALID EMAIL OR PASSWORD',
    REGISTER_SUCCESSFULLY: ' REGISTER_SUCCESSFULLY'
  }

  export enum UserType {
    PLAYER = 'player',
    ARBITER = 'arbiter',
  }

  export enum RelationType {
    FATHER = 'father',
    MOTHER = 'mother',
    OTHER = 'other'
  }

  export enum GenederType {
    MALE = 'male',
    FEMALE = 'female',
    other  = 'other'
  }
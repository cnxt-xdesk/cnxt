interface KeyPair {
    pub: String;
    priv: String;
    epub: String;
    epriv: String;
  }
  interface User {
    name: String;
    id: keyof KeyPair;
    profile: ProfileData;
  }
  
  interface ProfileData {
    user: User
    url: String;
  }
  
  interface TokenData {
    name: String;
    tag_hash: KeyPair<pub>
    description: String;
    mint_date: String;
    display_name: String;
    creator: ProfileData
  }
  
  interface Services {
    name: String;
    id: String;
  }
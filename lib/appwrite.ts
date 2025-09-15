import {
  Category,
  CreateUserParams,
  GetMenuParams,
  MenuItem,
  SignInParams,
  User,
} from '@/type';
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: 'com.skysoft.foodie',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  bucketId: '68bb8a320013f8ead23a',
  userCollectionId: 'user',
  categoriesCollectionId: 'categories',
  menuCollectionId: 'menu',
  customizationCollectionId: 'customization',
  menuCustomizationCollectionId: 'menu_customization',
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw new Error('Unable to create account. Try again');

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        avatar: avatarUrl,
      }
    );
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments<User>({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.userCollectionId,
      queries: [Query.equal('accountId', currentAccount.$id)],
    });

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];
    if (category) queries.push(Query.equal('categories', category));

    if (query) queries.push(Query.search('name', query));

    const menus = await databases.listDocuments<MenuItem>({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.menuCollectionId,
      queries: queries,
    });

    return menus.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments<Category>({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.categoriesCollectionId,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

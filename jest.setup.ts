import * as intents from "@canva/intents/test";
import * as user from "@canva/user/test";

intents.initTestEnvironment();
user.initTestEnvironment();

jest.mock("@canva/intents");
jest.mock("@canva/user");

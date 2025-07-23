// @ts-nocheck
/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Banking account number is a string of 5 to 17 alphanumeric values for representing an generic account number */
  AccountNumber: { input: any; output: any; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any; }
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: { input: any; output: any; }
  /** A country code as defined by ISO 3166-1 alpha-2 */
  CountryCode: { input: any; output: any; }
  /** A country name (short name) as defined by ISO 3166-1 */
  CountryName: { input: any; output: any; }
  /** A field whose value conforms to the standard cuid format as specified in https://github.com/ericelliott/cuid#broken-down */
  Cuid: { input: any; output: any; }
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: { input: any; output: any; }
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: { input: any; output: any; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
  /** A field whose value conforms to the standard DeweyDecimal format as specified by the OCLC https://www.oclc.org/content/dam/oclc/dewey/resources/summaries/deweysummaries.pdf */
  DeweyDecimal: { input: any; output: any; }
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any; }
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: { input: any; output: any; }
  /** A GeoJSON object as defined by RFC 7946: https://datatracker.ietf.org/doc/html/rfc7946 */
  GeoJSON: { input: any; output: any; }
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: { input: any; output: any; }
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: { input: any; output: any; }
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: { input: any; output: any; }
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: { input: any; output: any; }
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: { input: any; output: any; }
  /** A field whose value is either an IPv4 or IPv6 address: https://en.wikipedia.org/wiki/IP_address. */
  IP: { input: any; output: any; }
  /** A field whose value is an IPC Class Symbol within the International Patent Classification System: https://www.wipo.int/classifications/ipc/en/ */
  IPCPatent: { input: any; output: any; }
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: { input: any; output: any; }
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: { input: any; output: any; }
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: { input: any; output: any; }
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: { input: any; output: any; }
  /** A field whose value conforms to the Library of Congress Subclass Format ttps://www.loc.gov/catdir/cpso/lcco/ */
  LCCSubclass: { input: any; output: any; }
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: { input: any; output: any; }
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: { input: any; output: any; }
  /** A local date-time string (i.e., with no associated timezone) in `YYYY-MM-DDTHH:mm:ss` format, e.g. `2020-01-01T00:00:00`. */
  LocalDateTime: { input: any; output: any; }
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: { input: any; output: any; }
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: { input: any; output: any; }
  /** The locale in the format of a BCP 47 (RFC 5646) standard string */
  Locale: { input: any; output: any; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: { input: any; output: any; }
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: { input: any; output: any; }
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: { input: any; output: any; }
  /** Floats that will have a value less than 0. */
  NegativeFloat: { input: any; output: any; }
  /** Integers that will have a value less than 0. */
  NegativeInt: { input: any; output: any; }
  /** A string that cannot be passed as an empty value */
  NonEmptyString: { input: any; output: any; }
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: { input: any; output: any; }
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: { input: any; output: any; }
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: { input: any; output: any; }
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: { input: any; output: any; }
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: { input: any; output: any; }
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: { input: any; output: any; }
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: { input: any; output: any; }
  /** Floats that will have a value greater than 0. */
  PositiveFloat: { input: any; output: any; }
  /** Integers that will have a value greater than 0. */
  PositiveInt: { input: any; output: any; }
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: { input: any; output: any; }
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: { input: any; output: any; }
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: { input: any; output: any; }
  /** In the US, an ABA routing transit number (`ABA RTN`) is a nine-digit code to identify the financial institution. */
  RoutingNumber: { input: any; output: any; }
  /** A field whose value conforms to the standard personal number (personnummer) formats for Sweden */
  SESSN: { input: any; output: any; }
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: { input: any; output: any; }
  /** A field whose value is a Semantic Version: https://semver.org */
  SemVer: { input: any; output: any; }
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: { input: any; output: any; }
  /** A field whose value exists in the standard IANA Time Zone Database: https://www.iana.org/time-zones */
  TimeZone: { input: any; output: any; }
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: any; output: any; }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: any; output: any; }
  /** A currency string, such as $21.25 */
  USCurrency: { input: any; output: any; }
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: { input: any; output: any; }
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: { input: any; output: any; }
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: { input: any; output: any; }
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: { input: any; output: any; }
  /** Represents NULL values */
  Void: { input: any; output: any; }
};

export type AcceptOrDeclineSwapInput = {
  status: Status;
  swapId: Scalars['ID']['input'];
};

export type Authenticated = {
  __typename?: 'Authenticated';
  token?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type CancelSwapRequestInput = {
  swapId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Maybe<Message>>;
  recentMessage?: Maybe<Message>;
  updatedAt: Scalars['String']['output'];
  users: ChatUsers;
};

export type ChatUsers = {
  __typename?: 'ChatUsers';
  id?: Maybe<Scalars['ID']['output']>;
  receiver?: Maybe<User>;
  sender?: Maybe<User>;
};

export type ChatUsersInput = {
  receiver: Scalars['ID']['input'];
  sender: Scalars['ID']['input'];
};

export type Education = {
  __typename?: 'Education';
  degree?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  fieldOfStudy?: Maybe<Scalars['String']['output']>;
  institution?: Maybe<Scalars['String']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
};

export type EducationInput = {
  degree?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  fieldOfStudy?: InputMaybe<Scalars['String']['input']>;
  institution?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Filters = {
  availability?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  mediaUrl?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  messageType: MessageType;
  sender?: Maybe<User>;
  status: MessagesStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type MessageInput = {
  mediaUrl?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  messageType: MessageType;
  sender: Scalars['ID']['input'];
};

export enum MessageType {
  Document = 'DOCUMENT',
  Image = 'IMAGE',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export enum MessagesStatus {
  Deleted = 'DELETED',
  Delivered = 'DELIVERED',
  Read = 'READ',
  Sent = 'SENT'
}

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  acceptOrDeclineSwapRequest: Swap;
  cancelSwapRequest: Swap;
  changePassword: Response;
  completeAuthAndSignToken: Authenticated;
  createAccount: Response;
  createSwapRequest: Swap;
  login?: Maybe<Response>;
  updateSwap?: Maybe<Swap>;
  updateUser: User;
  upsertMessage?: Maybe<Chat>;
  verifyOtpAndSaveNewPassword: Response;
};


export type MutationAcceptOrDeclineSwapRequestArgs = {
  input: AcceptOrDeclineSwapInput;
};


export type MutationCancelSwapRequestArgs = {
  input: CancelSwapRequestInput;
};


export type MutationChangePasswordArgs = {
  data: UpdatePasswordInput;
};


export type MutationCompleteAuthAndSignTokenArgs = {
  otp: Scalars['String']['input'];
};


export type MutationCreateAccountArgs = {
  data: CreateUserInput;
};


export type MutationCreateSwapRequestArgs = {
  input: SwapRequestInput;
};


export type MutationLoginArgs = {
  data: LoginUserInput;
};


export type MutationUpdateSwapArgs = {
  input: UpdateSwapInput;
};


export type MutationUpdateUserArgs = {
  data?: InputMaybe<UpdateUserInput>;
};


export type MutationUpsertMessageArgs = {
  data: NewMessageInput;
};


export type MutationVerifyOtpAndSaveNewPasswordArgs = {
  otp: Scalars['String']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  allChats: Array<Maybe<Chat>>;
  getChatById?: Maybe<Chat>;
  getChatByUserId: Array<Maybe<Chat>>;
  getMessages: Chat;
  getRequestedSwaps?: Maybe<SwapConnection>;
  getSwapByUsers?: Maybe<Swap>;
  getSwapRequest?: Maybe<Swap>;
  getSwapRequests?: Maybe<SwapConnection>;
  hello?: Maybe<Scalars['String']['output']>;
  me?: Maybe<User>;
  recommendation?: Maybe<RecomendationConnection>;
  search?: Maybe<UserConnection>;
  user?: Maybe<User>;
};


export type QueryAllChatsArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetChatByIdArgs = {
  chatId: Scalars['ID']['input'];
};


export type QueryGetChatByUserIdArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetMessagesArgs = {
  data: GetMessageInput;
};


export type QueryGetRequestedSwapsArgs = {
  filter?: InputMaybe<SwapFilter>;
};


export type QueryGetSwapByUsersArgs = {
  data?: InputMaybe<SwapByUsers>;
};


export type QueryGetSwapRequestArgs = {
  swapId: Scalars['ID']['input'];
};


export type QueryGetSwapRequestsArgs = {
  filter?: InputMaybe<SwapFilter>;
};


export type QueryRecommendationArgs = {
  filters?: InputMaybe<RecommendationFilters>;
};


export type QuerySearchArgs = {
  filters?: InputMaybe<Filters>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Recomendation = {
  __typename?: 'Recomendation';
  levelDifference?: Maybe<Scalars['Int']['output']>;
  matchScore?: Maybe<Scalars['Float']['output']>;
  matchedSkill?: Maybe<Array<Maybe<Skill>>>;
  mutualExchange?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
};

export type RecomendationConnection = {
  __typename?: 'RecomendationConnection';
  edges?: Maybe<Array<Maybe<Recomendation>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']['output']>;
};

export enum ScheduleStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Scheduled = 'SCHEDULED'
}

export type Session = {
  __typename?: 'Session';
  date: Scalars['Date']['output'];
  recievedBy: Scalars['ID']['output'];
  skill: Scalars['String']['output'];
  status: ScheduleStatus;
  taughtBy: Scalars['ID']['output'];
  time: Scalars['String']['output'];
};

export type SessionInput = {
  date: Scalars['Date']['input'];
  recievedBy: Scalars['ID']['input'];
  skill: Scalars['String']['input'];
  status?: InputMaybe<ScheduleStatus>;
  taughtBy: Scalars['ID']['input'];
  time: Scalars['String']['input'];
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type SkillInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  level: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export enum Status {
  Accepted = 'ACCEPTED',
  Completed = 'COMPLETED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']['output']>;
  getChatByUserId: Array<Maybe<Chat>>;
  newChatCreated?: Maybe<Chat>;
  swapUpdated?: Maybe<Swap>;
};


export type SubscriptionGetChatByUserIdArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionNewChatCreatedArgs = {
  userId: Scalars['ID']['input'];
};


export type SubscriptionSwapUpdatedArgs = {
  userId: Scalars['ID']['input'];
};

export type Swap = {
  __typename?: 'Swap';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  receiver?: Maybe<User>;
  receiverId: Scalars['ID']['output'];
  sender?: Maybe<User>;
  senderId: Scalars['ID']['output'];
  sessions?: Maybe<Array<Maybe<Session>>>;
  skills?: Maybe<Array<Maybe<SwappedSkill>>>;
  status: Status;
  timeTable?: Maybe<Array<Maybe<TimeTable>>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SwapByUsers = {
  receiverId: Scalars['ID']['input'];
  senderId: Scalars['ID']['input'];
};

export type SwapConnection = {
  __typename?: 'SwapConnection';
  edges?: Maybe<Array<Swap>>;
  pageInfo?: Maybe<PageInfo>;
};

export type SwapFilter = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Status>;
};

export type SwapRequestInput = {
  receiverId: Scalars['ID']['input'];
};

export type SwappedSkill = {
  __typename?: 'SwappedSkill';
  By: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type SwappedSkillInput = {
  By: Scalars['ID']['input'];
  level: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type TimeTable = {
  __typename?: 'TimeTable';
  dayOfweek: Scalars['String']['output'];
  durationInWeeks: Scalars['Int']['output'];
  skill: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  taughtBy: Scalars['ID']['output'];
  time: Scalars['String']['output'];
};

export type TimeTableInput = {
  dayOfweek: Scalars['String']['input'];
  durationInWeeks: Scalars['Int']['input'];
  skill: Scalars['String']['input'];
  startDate: Scalars['Date']['input'];
  taughtBy: Scalars['ID']['input'];
  time: Scalars['String']['input'];
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type UpdateUserInput = {
  availability?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bio?: InputMaybe<Scalars['String']['input']>;
  education?: InputMaybe<EducationInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gitHub?: InputMaybe<Scalars['String']['input']>;
  isProfileComplete?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  linkedIn?: InputMaybe<Scalars['String']['input']>;
  portfolio?: InputMaybe<Scalars['String']['input']>;
  profile_img?: InputMaybe<Scalars['String']['input']>;
  skillsProficientAt?: InputMaybe<Array<InputMaybe<SkillInput>>>;
  skillsToLearn?: InputMaybe<Array<InputMaybe<SkillInput>>>;
};

export type User = {
  __typename?: 'User';
  availability?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  averageRating?: Maybe<Scalars['Int']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  education?: Maybe<Education>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gitHub?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAuthenticated?: Maybe<Scalars['Boolean']['output']>;
  isProfileComplete?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  linkedIn?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  portfolio?: Maybe<Scalars['String']['output']>;
  profile_img?: Maybe<Scalars['String']['output']>;
  skillsProficientAt?: Maybe<Array<Maybe<Skill>>>;
  skillsToLearn?: Maybe<Array<Maybe<Skill>>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<User>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type GetMessageInput = {
  chatId: Scalars['ID']['input'];
  from: Scalars['ID']['input'];
  to: Scalars['ID']['input'];
};

export type LoginUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type NewMessageInput = {
  chatId: Scalars['ID']['input'];
  from: Scalars['String']['input'];
  message: MessageInput;
  to: Scalars['String']['input'];
  users: ChatUsersInput;
};

export type RecommendationFilters = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSwapInput = {
  id: Scalars['ID']['input'];
  sessions?: InputMaybe<Array<InputMaybe<SessionInput>>>;
  skills?: InputMaybe<Array<InputMaybe<SwappedSkillInput>>>;
  status?: InputMaybe<Status>;
  timeTable?: InputMaybe<Array<InputMaybe<TimeTableInput>>>;
};

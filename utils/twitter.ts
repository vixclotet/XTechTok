import { TwitterApi } from "twitter-api-v2"

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN as string)

export async function getUserProfile(username: string) {
  try {
    const user = await client.v2.userByUsername(username, {
      "user.fields": ["profile_image_url", "description"],
    })
    return user.data
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error)
    return null
  }
}

// Fallback data for when API fails
export const fallbackUserData = {
  elonmusk: { name: "Elon Musk", description: "CEO of Tesla, SpaceX, and X" },
  naval: { name: "Naval", description: "Angel investor and entrepreneur" },
  pmarca: { name: "Marc Andreessen", description: "Co-founder of Andreessen Horowitz" },
  BillGates: { name: "Bill Gates", description: "Co-chair of the Bill & Melinda Gates Foundation" },
  tim_cook: { name: "Tim Cook", description: "CEO of Apple" },
  satyanadella: { name: "Satya Nadella", description: "CEO of Microsoft" },
  sama: { name: "Sam Altman", description: "CEO of OpenAI" },
  jack: { name: "Jack Dorsey", description: "Co-founder of Twitter and Block" },
  JeffBezos: { name: "Jeff Bezos", description: "Founder of Amazon and Blue Origin" },
  ev: { name: "Ev Williams", description: "Co-founder of Twitter and Medium" },
  biz: { name: "Biz Stone", description: "Co-founder of Twitter" },
  patrickc: { name: "Patrick Collison", description: "CEO of Stripe" },
  scobleizer: { name: "Robert Scoble", description: "Tech evangelist and author" },
  kevinrose: { name: "Kevin Rose", description: "Co-founder of Digg and entrepreneur" },
  alexisohanian: { name: "Alexis Ohanian", description: "Co-founder of Reddit" },
  dharmesh: { name: "Dharmesh Shah", description: "Co-founder and CTO of HubSpot" },
  a16z: { name: "Andreessen Horowitz", description: "Venture capital firm" },
}


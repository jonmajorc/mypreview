import { FeedStoreModel } from "./feed-store"

test("can be created", () => {
  const instance = FeedStoreModel.create({})

  expect(instance).toBeTruthy()
})

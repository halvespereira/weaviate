// weaviate package
import weaviate from "weaviate-client";

// weaviate setup
const client = weaviate.client({
  scheme: "https",
  host: "demo.dataset.playground.semi.technology/",
});

const withWhereObj = (publication, minWordCount) => {
  if (publication) {
    return {
      operator: "And",
      operands: [
        {
          operator: "Equal",
          path: ["inPublication", "Publication", "name"],
          valueText: `${publication}`,
        },
        {
          path: ["wordCount"],
          operator: "GreaterThan",
          valueInt: Number(minWordCount) || 1,
        },
      ],
    };
  } else {
    return {
      path: ["wordCount"],
      operator: "GreaterThan",
      valueInt: Number(minWordCount) || 1,
    };
  }
};

const getArticles = async (word, limit, publication, minWordCount) => {
  const res = await client.graphql
    .get()
    .withNearText({
      concepts: [word],
      certainty: 0.7,
    })
    .withClassName("Article")
    .withFields(
      "title url wordCount inPublication {... on Publication {name}} _additional {certainty}"
    )
    .withWhere(withWhereObj(publication, minWordCount))
    .withLimit(Number(limit))
    .do();

  return res.data.Get.Article;
};

export default getArticles;

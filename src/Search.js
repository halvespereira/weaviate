// weaviate package
import weaviate from "weaviate-client";

// weaviate setup
const client = weaviate.client({
  scheme: "https",
  host: "demo.dataset.playground.semi.technology/",
});

const withWhereObj = (publication, count) => {
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
          valueInt: Number(count) || 1,
        },
      ],
    };
  } else {
    return {
      path: ["wordCount"],
      operator: "GreaterThan",
      valueInt: Number(count) || 1,
    };
  }
};

const searchFunction = async (word, limit, publication, count) => {
  const res = await client.graphql
    .get()
    .withClassName("Article")
    .withFields(
      "title url wordCount InPublication {... on Publication {name}} _nearestNeighbors{ neighbors {concept}}"
    )
    .withExplore({
      concepts: [word],
      certainty: 0.7,
    })
    .withWhere(withWhereObj(publication, count))
    .withLimit(Number(limit))
    .do();

  return res.data.Get.Things.Article;
};

export default searchFunction;

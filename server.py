from flask import Flask, request
import fastai.vision as fastai


app = Flask(__name__)

CLASSIFIER = fastai.load_learner("models", "classifier.pkl")


@app.route("/classify", methods=["POST", "OPTIONS"])  # define the API methods
def classify():
    files = request.files
    image = fastai.image.open_image(files['image'])  # load the image from the API call
    prediction = CLASSIFIER.predict(image)  # make a classification prediction from the call
    print(prediction)

    return {
        "brandPredictions": sorted(
            list(
                zip(
                    CLASSIFIER.data.classes,
                    [round(x, 4) for x in map(float, prediction[2])]
                )
            ),
            key=lambda p: p[1],
            reverse=True
        )  # data processed to be printed correctly
    }


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

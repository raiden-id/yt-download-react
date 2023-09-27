import FormInput from "../Elements/Input/input";

function Body() {
  return (
    <div>
      <div className="mx-4">
        <div className="bg-gray-100  p-4 rounded-lg">
          <div className="my-7">
            <div className="flex justify-center text-3xl font-semibold mb-10">
              Unduh video dan audio dari YouTube
            </div>
            <FormInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;

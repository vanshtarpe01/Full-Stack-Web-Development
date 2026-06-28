const CreateTask = () => {
  return (
    <div>
      <div className="mt-10">
        <form className="flex flex-wrap items-start justify-between gap-6 rounded-xl bg-gray-800 p-8 shadow-lg">
          
          {/* Left Section */}
          <div className="w-full md:w-[48%]">
            <div className="mb-2">
              <h3 className="mb-2 text-lg font-medium">Task Title</h3>
              <input
                type="text"
                placeholder="Make a UI Design"
                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div className="mb-2">
              <h3 className="mb-2 text-lg font-medium">Date</h3>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div className="mb-2">
              <h3 className="mb-2 text-lg font-medium">Assign To</h3>
              <input
                type="text"
                placeholder="Employee Name"
                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div className="mb-2">
              <h3 className="mb-2 text-lg font-medium">Category</h3>
              <input
                type="text"
                placeholder="Design, Development, Testing"
                className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 outline-none transition focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-[48%]">
            <h3 className="mb-2 text-lg font-medium">Description</h3>

            <textarea
              rows="12"
              placeholder="Enter task details..."
              className="w-full resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 outline-none transition focus:border-emerald-500"
            ></textarea>
          </div>

          {/* Button */}
          <div className="w-full">
            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-700 active:scale-95"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask

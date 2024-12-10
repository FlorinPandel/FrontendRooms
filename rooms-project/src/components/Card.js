export default function Card({ name, price }) {
  return (
    <div>
      <div class="p-8 flex items-center justify-center">
        <div class="bg-white rounded-lg overflow-hidden shadow-2xl">
          <img
            class="h-48 w-full object-cover object-end"
            src="https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
            alt="Home in Countryside"
          />
          <div class="p-6">
            <div class="flex items-baseline">
              <span class="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
                New
              </span>
              <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                3 beds &bull; 2 baths
              </div>
            </div>
            <h4 class="mt-2 font-semibold text-lg leading-tight truncate">
              {name}
            </h4>

            <div class="mt-1">
              <span>{price}</span>
              <span class="text-gray-600 text-sm">/ wk</span>
            </div>
            <div class="mt-2 flex items-center">
              <span class="text-teal-600 font-semibold">
                <span>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
                </span>
              </span>
              <span class="ml-2 text-gray-600 text-sm">34 reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

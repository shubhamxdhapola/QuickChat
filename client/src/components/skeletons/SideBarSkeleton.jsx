const SidebarSkeleton = () => {
  
  const skeletonContacts = Array(5).fill(null);

  return (
    <div className="w-full h-full pl-3">
      {skeletonContacts.map((_, idx) => (
        <div key={idx} className="w-full p-3 flex items-center gap-3">
          <div className="relative mx-auto lg:mx-0">
            <div className="skeleton size-12 rounded-full" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <div className="skeleton h-4 w-32 mb-2 rounded-md" />
            <div className="skeleton h-3 w-16 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SidebarSkeleton;
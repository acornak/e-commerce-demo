import { useEffect, useState } from "react";
import { UseBoundStore } from "zustand";

const useHydration = (useStore: UseBoundStore<any>) => {
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		const unsubHydrate = useStore.persist.onHydrate(() =>
			setHydrated(false),
		);

		const unsubFinishHydration = useStore.persist.onFinishHydration(() =>
			setHydrated(true),
		);

		setHydrated(useStore.persist.hasHydrated());

		return () => {
			unsubHydrate();
			unsubFinishHydration();
		};
	}, []);

	return hydrated;
};

export default useHydration;

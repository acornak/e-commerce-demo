import { useEffect, useState } from "react";
import { UseBoundStore } from "zustand";

const useHydration = (useStore: UseBoundStore<any>) => {
	const [hydrated, setHydrated] = useState<boolean>(false);

	useEffect(() => {
		/* istanbul ignore next */
		const unsubHydrate = useStore.persist.onHydrate(() =>
			setHydrated(false),
		);

		/* istanbul ignore next */
		const unsubFinishHydration = useStore.persist.onFinishHydration(() =>
			setHydrated(true),
		);

		setHydrated(useStore.persist.hasHydrated());

		return () => {
			unsubHydrate();
			unsubFinishHydration();
		};
	}, [useStore.persist]);

	return hydrated;
};

export default useHydration;
